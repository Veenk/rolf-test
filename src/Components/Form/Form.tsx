import React, {useEffect} from 'react';
import {
    Box,
    Button,
    FilledInput,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    OutlinedInput
} from "@material-ui/core";
import './form.scss';
import QuestionsService from '../../Service/QuestionsService';
import {FetchError, FormErr, FormObject, QuestionObject} from "../../typings";
import {useDispatch} from "react-redux";
import {validate} from "../../helpers/validation";
export const Form = () => {
    const [form, setForm] = React.useState<FormObject>({
        brand: "", email: "", model: "", text: "", name: ""
    });
    const [formErr, setFormErr] = React.useState<FormErr>({brand: true, email: true, model: true, text: true, name: true});
    const [formField, setFormField] = React.useState<FormErr>({brand: false, email: false, model: false, text: false, name: false});


    const questionsDispatcher = useDispatch();

    const addQuestion = (question: QuestionObject) =>{
         questionsDispatcher({type: "ADD_QUESTION", payload: question})
    }

    function clearForm() {
        setForm({brand: "", email: "", model: "", text: "", name: ""})
    }

    const submitQuestion = () => {
        const date = new Date()
        QuestionsService.postQuestion(form, date)
            .then((response: any | FetchError) => {
                const {email, ...y} = form;
                y['date'] = date
                addQuestion(y)
                clearForm()
        })
    }

    const formSetter = (attr: string, value: string) => {
        setForm((prevState: FormObject) =>
            ({...prevState, [attr]: value}))
    }
    const formErrSetter = (attr: string, value: boolean) => {
        formFieldSetter(attr, value)
        setFormErr((prevState: FormErr) =>
            ({...prevState, [attr]: value}))

    }
    const formFieldSetter = (attr: string, value: boolean) => {
        setFormField((prevState: FormErr) =>
            ({...prevState, [attr]: value}))
    }
    return (
        <div className={'form__wrapper'}>
            <div className={'form__title'}>Задайте вопрос</div>
            <FormControl error={formField.name} variant="standard">
                <InputLabel htmlFor="name-input">Имя</InputLabel>
                <Input
                    id="name-input"
                    value={form.name}
                    onChange={(e) => formSetter('name', e.currentTarget.value)}
                    onBlur={(e) =>{
                            formErrSetter('name',!validate('name', e.currentTarget.value))
                        }
                    }
                    onFocus={() => formFieldSetter('name', false)}
                    aria-describedby='name-helper-text'
                />
                <FormHelperText id="name-helper-text" style={{display: formField.name ? 'block' : 'none' }}>
                    Только кириллица от 2х до 30 символов
                </FormHelperText>
            </FormControl>
            <FormControl error={formField.model} variant="standard">
                <InputLabel htmlFor="model-input">Модель</InputLabel>
                <Input
                    id="model-input"
                    value={form.model}
                    onChange={(e) => formSetter('model', e.currentTarget.value)}
                    onBlur={(e) => {
                            formErrSetter('model',!validate('model', e.currentTarget.value))
                        }
                    }
                    onFocus={() => formFieldSetter('model', false)}
                    aria-describedby='model-helper-text'
                />
                <FormHelperText id="model-helper-text" style={{display: formField.model ? 'block' : 'none' }}>
                    Только латинские буквы и цифры от 4х до 20 символо
                </FormHelperText>
            </FormControl>
            <FormControl error={formField.brand} variant="standard">
                <InputLabel htmlFor="component-disabled">Марка</InputLabel>
                <Input
                    id="component-disabled"
                    value={form.brand}
                    onChange={(e) => formSetter('brand', e.currentTarget.value)}
                    onBlur={(e) => {
                            formErrSetter('brand',!validate('brand', e.currentTarget.value))
                        }
                    }
                    onFocus={() => formFieldSetter('brand',false)}
                    aria-describedby='brand-helper-text'
                />
                <FormHelperText id="brand-helper-text" style={{display: formField.brand ? 'block' : 'none' }}>
                    Только латинские буквы от 4х до 20 символов
                </FormHelperText>
            </FormControl>
            <FormControl error={formField.email} variant="standard">
                <InputLabel htmlFor="component-error">Email</InputLabel>
                <Input
                    id="component-error"
                    value={form.email}
                    onChange={(e) => formSetter('email', e.currentTarget.value)}
                    onBlur={(e) => {
                            formErrSetter('email',!validate('email', e.currentTarget.value))
                        }
                    }
                    onFocus={() => formFieldSetter('email', false)}
                    aria-describedby='email-helper-text'
                />
                <FormHelperText id="email-helper-text" style={{display: formField.email ? 'block' : 'none' }}>
                    заполните Email правильно
                </FormHelperText>
            </FormControl>
            <FormControl error={formField.text}>
                <InputLabel htmlFor="component-outlined">Текст</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    multiline={true}
                    value={form.text}
                    onChange={(e) => formSetter('text', e.currentTarget.value )}
                    label="Текст"
                    onBlur={(e) =>{
                            formErrSetter('text',!validate('text', e.currentTarget.value))
                        }
                    }
                    onFocus={() => formFieldSetter('text', false)}
                    aria-describedby={'text-helper-text'}
                />
                <FormHelperText id="text-helper-text" style={{display: formField.text ? 'block' : 'none' }}>
                    Исключаются спецсимволы, не пустое и не более 500 символов
                </FormHelperText>
            </FormControl>

            <Button disabled={formErr.name || formErr.model || formErr.brand || formErr.text} variant="contained" type={'submit'} onClick={() => submitQuestion()}>
                Отправить
            </Button>
        </div>
    )
}