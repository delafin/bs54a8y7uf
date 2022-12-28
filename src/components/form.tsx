
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { useContext, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate'
import { TypeOf } from 'zod';
import { useHttp } from '../hooks/useHttp';
import Image from 'next/image';
import { dataContext } from '../store';
import Preloader from './preloader';
    
const ContactForm = () => {
    
	const parent = useRef(null)
	const parentThank = useRef(null)
    // const formikHandler = useFormikContext(null);
    // ,{resetForm, setSubmitting}
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        
    parent.current && autoAnimate(parent.current)
	parentThank.current && autoAnimate(parentThank.current)
	}, [parent])

    const [fileName, setFileName] = useState('Upload your photo');
    // const [token, setToken] = useState('');
    // const [file, setFile] = useState({});
    const [thank, setThank] = useState(false);
    const { store, dispatchStore } = useContext(dataContext);
    
    const {request} = useHttp();
    const onInputFileName = (name:string) => {
        if (name.length < 10) {
            return setFileName(name);
        } else {
            // const fileExtension = name.match(/\.([^.]+)$|$/)?.[1];
            const filePropExtension = name.split('.').reverse()[0];
            const filePropName = name.replace(/\.([^.]+)$|$/,'');
            if (filePropExtension){
                return setFileName(`${filePropName.slice(0, 7)}...${filePropExtension.slice(0, 7)}`);
            }
            return setFileName(`${filePropName.slice(0, 7)}...`);
        }
    }

    const getToken = async () => {
        
        return await request(
            'https://frontend-test-assignment-api.abz.agency/api/v1/token')
            .then((data) => {return data})
            .catch((e: Error) => console.log('Token:' + e));
    }
    const newUser = async (data:FormData, token:string, setSubmitting: (condition:boolean)=>void, resetForm:any) => {
        // const header = {'Content-Type': 'multipart/form-data',  'Token': token};
        const header = {'Token': token};
        return await request(
            'https://frontend-test-assignment-api.abz.agency/api/v1/users', 'POST', data, header)
            .then((data) => {
                setIsError(()=>false)
                setThank((variable) => !variable);
                setTimeout(() => {
                    setThank((variable) => !variable);
                }, 10000);
                request(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${5 * store.counter}`, 'GET').then((result) => {
                    resetForm();
                    // handleReset()
                    dispatchStore({type:'LOADED',payload:result.users});
                    setSubmitting(false)
                }).catch((err) => {
                    setSubmitting(false)
                    // handleReset()
                    resetForm();
                    setTimeout(() => {
                        dispatchStore({type:'IDLE'})
                    }, 3000);
                })
            }
            )
            .catch((e: Error) => {
                setIsError(() => true)
               
                console.log('New User: ' + e);
                setSubmitting(false)
                setTimeout(() => {
                    dispatchStore({type:'IDLE'})
                    console.log(isError);
                }, 3000);
                setTimeout(() => {
                    setIsError(() => false)
                }, 15000);
            });
    }
    
    const submitForm = (values: any, setSubmitting: (condition:boolean)=>void,resetForm:any):void => {
        
        switch (values.position) {
            case 'frontend':
                values.position_id = 1;
                break

            case 'backend':
                values.position_id = 2;
                break

            case 'designer':
                values.position_id = 3;
            break

            case 'qa':
                values.position_id = 4;
            break
                default:
                break;
        }

        const formData = new FormData(); 
        for (const value in values) {
            formData.append(value, values[value]);
        }
        // for (const property of formData.entries()) {
        //     console.log(property[0], property[1]);
        //   }

        getToken().then(data => newUser(formData,data.token,setSubmitting,resetForm));
        
        // await fetch(
        //     "https://frontend-test-assignment-api.abz.agency/api/v1/users",
        //     {
        //       body: formData,
        //       method: "POST",
        //       headers: {
        //         'Token': token
        //       },
        //     }
        //   )
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log(data);
        //     })
        //     .catch((error) => {
        //       console.error("Error:", error);
        //     });
            
    }

    const classField = (touch: boolean | undefined , error: string | undefined) => {
        const errorClass = touch && error ? `outline-red  border-red` : `border-[#D0CFCF] outline-[#D0CFCF]`;
        return `peer w-full rounded-[4px] border-[1px]  py-4 px-4 outline-[#D0CFCF] ${errorClass}`
    }
    const classLabel = (touch: boolean | undefined , error: string | undefined) => {
        const errorClass = touch && error ? `text-red` : `text-[#7E7E7E]`;
        return `absolute left-3 top-0 -translate-y-1/2 bg-grey px-2 text-xs transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-focus:top-0 peer-focus:bg-grey ${errorClass}`
    }
    const classFile = (touch: boolean | undefined , error: string | undefined) => {
        const errorClass = touch && error ? `text-[#7E7E7E] border-red` : `border-[#D0CFCF] text-[#7E7E7E]`;
        return `w-full min-w-full cursor-pointer rounded-[4px] border-[1px]  px-4 py-[14px] pl-[100px]  ${errorClass}`
    }
    const classFileLabel = (touch: boolean | undefined , error: string | undefined) => {
        const errorClass = touch && error ? `text-black border-red` : `text-black border-black`;
        return `absolute left-0 top-0 cursor-pointer rounded-l-[4px] border-[1px] px-4 py-[14px] ${errorClass}`
    }
    const classButton = (condition: boolean | undefined) => {
        const errorClass = condition ? `bg-darkgrey hover:bg-darkgrey` : `hover:bg-lightyellow bg-yellow` ;
        return `flex gap-2 items-center justify-center mx-auto mt-[50px] block cursor-pointer rounded-[80px]  text-white  px-[22px] pt-1 pb-1 transition-colors  mb-8 ${errorClass}`
    }
    const classError = (condition = true) => {
        return `${condition ? 'display-block mt-4 mx-auto text-red' : 'display-block mt-4 mx-auto text-red' }`
    }

    // function checkIfFilesAreTooBig(files?: [File]): boolean {
    //     let valid = true
    //     // if (files) {
    //     //   files.map(file => {
    //     //     const size = file.size / 1024 / 1024
    //     //     if (size > 10) {
    //     //       valid = false
    //     //     }
    //     //   })
    //     // }
    //     if (files) {
    //         const size = files[0].size / 1024 / 1024
    //         if (size > 10) {
    //           valid = false
    //         }
    //       }
    //     return valid
    //   }
    //                       // Error :
    //                 //  Yup.mixed()
    //                 //     .nullable()
    //                 //     // .notRequired()
    //                 //     .required('This field is required !')
    //                 //     .test("FILE_SIZE", "Uploaded file is too large.", 
    //                 //     checkIfFilesAreTooBig)
    //                 //     .test("FILE_FORMAT", "Uploaded file has unsupported format.", 
    //                 //     value => { 
    //                 //         console.log('value.type:');
    //                 //         console.log(value);
    //                 //         // console.log('includes in array : ' + value && ['jpg', 'jpeg', 'png'].includes(value.type));
    //                 //         // return !value || (value && ['jpg', 'jpeg', 'png'].includes(value.type))
    //                 //         return !value
    //                 //     }),
      
    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    name: '',
                    phone: '',
                    photo: undefined,
                    position: '',
                    
                }}
                validationSchema={Yup.object({
                    position:  
                    // Yup.boolean().required().oneOf([0 , 1], 'Selecting the position is required'),
                    Yup.string().min(1, 'Please, use at least 1 position !').required('This field is required !'),

                    // Checkbox:
                    // Yup.array()
                    //   .min(1,"This field is required !").of(Yup.string().required('This field is required !')).required('This field is required !'),
                    // photo:
                    photo: 
                    // Ok :
                    // Yup.mixed()
                    //     .nullable()
                    //     .notRequired()
                    //     .required('This field is required !')
                    //     .test("FILE_SIZE", "Uploaded file is too large.", 
                    //     value => 
                    //         { 
                    //             return !value || (value && value.size <= 1100000)
                    //         }
                    //     )
                    //     .test("FILE_FORMAT", "Uploaded file has unsupported format.", 
                    //     value => !value || (value && ['.jpg', '.jpeg', '.png'].includes(value.type))),

                    // Ok from codepen:
                    Yup.mixed()
                        // .notRequired()
                        // .nullable()
                        .test(
                            "fileSize",
                            "File size too large, max file size is 5 Mb",
                            (file) => {
                                if (file) {
                                    // return file.size <= 1 * 1000000 + 100000;
                                    return file.size <= 5 * 1000000;
                                } else {
                                    return true;
                                }
                            }
                        )
                        .test(
                        "fileType",
                        "Incorrect file type",
                        (file) =>
                            file && ["image/png", "image/jpg", "image/jpeg", "jpg"].includes(file.type)
                        ),

                    name: Yup.string()
                        .min(3, 'Please, use at least 3 characters !')
                        .max(60, 'Please, use less than 60 characters !')
                        .required('This field is required !'),
                    email: Yup.string()
                        // .email('Please, use a valid email address')
                        .matches(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/, 'Please, use a valid email address') //User email, must be a valid email according to RFC2822
                        .max(60, 'Please, use less than 60 characters !')
                        .required('This field is required !'),
                        
                    phone: Yup.string()
                        .required('This field is required !')
                        // .matches(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/, 'Please, use a valid phone number.'),
                        .matches(/^[\+]{0,1}380([0-9]{9})$/, 'Please, use a valid phone number.'), // User phone number. Number should start with code of Ukraine,like: +380955388485
                })}
                // onSubmit={(values, {setSubmitting}) => {
                onSubmit={(values, {setSubmitting,resetForm}) => {
                    submitForm(values,setSubmitting,resetForm);
                }}>
                { formik => (
                    <Form className={`mx-auto mt-[50px] flex max-w-sm flex-col items-center justify-center ${thank ? 'hidden': 'visible'}`} ref={parent}>
                        <div className='w-full'>
                            <div className='group relative'>
                                <Field
                                    id='name'
                                    name='name'
                                    type='text'
                                    placeholder=' '
                                    className={classField(formik.touched.name,formik.errors.name)}
                                />
                                
                                <label htmlFor='name'
                                className={classLabel(formik.touched.name,formik.errors.name)}>
                                    Your name
                                </label>
                            </div>
                            <ErrorMessage className='mt-1 pl-4 text-red' name='name' component='div'/>
                        </div>
                        <div className='mt-[50px] w-full'>
                            <div className='group relative'>
                                <Field
                                    id='email'
                                    name='email'
                                    type='email'
                                    placeholder=' '
                                    className={classField(formik.touched.email,formik.errors.email)}
                                />
                                <label htmlFor='email' 
                                className={classLabel(formik.touched.email,formik.errors.email)}>
                                    Email
                                </label>
                            </div>
                            <ErrorMessage className='mt-1 pl-4 text-red' name='email' component='div'/>
                        </div>
                        <div className='mt-[50px] w-full'>
                            <div className='group relative'>
                                <Field
                                    id='phone'
                                    type='text'
                                    name='phone'
                                    placeholder=' '
                                    className={classField(formik.touched.phone,formik.errors.phone)}
                                />
                                <label htmlFor='phone' 
                                className={classLabel(formik.touched.phone,formik.errors.phone)}>
                                    Phone
                                </label>
                            </div>
                            <ErrorMessage className='mt-1 pl-4 text-red' name='phone' component='div'/>
                        </div>
                        <label className='mt-11 self-start text-right'>Select your position</label>
                        <fieldset className='mt-[11px] flex flex-col gap-[7px] self-start' name='position' id='position'>
                            <label className='flex items-center justify-start '>
                                <Field
                                    type='radio'
                                    name='position'
                                    id='frontend'
                                    value='frontend'
                                    className='peer appearance-none'
                                    tabIndex={0}
                                />
                                <span className='colors relative h-5 w-5 rounded-full border-[1px] border-[#D0CFCF] transition-colors after:absolute after:top-1/2 after:left-1/2 after:h-[10px] after:w-[10px] after:-translate-y-1/2 after:-translate-x-1/2 after:rounded-full after:bg-transparent after:transition-colors peer-checked:border-blue peer-checked:after:bg-blue'></span>
                                <p className='pl-3'>Frontend developer</p>
                            </label>
                            <label className='flex items-center justify-start '>
                                <Field
                                    type='radio'
                                    name='position'
                                    id='backend'
                                    value='backend'
                                    className='peer appearance-none'
                                    tabIndex={0}
                                />
                                <span className='colors relative h-5 w-5 rounded-full border-[1px] border-[#D0CFCF] transition-colors after:absolute after:top-1/2 after:left-1/2 after:h-[10px] after:w-[10px] after:-translate-y-1/2 after:-translate-x-1/2 after:rounded-full after:bg-transparent after:transition-colors peer-checked:border-blue peer-checked:after:bg-blue'></span>
                                <p className='pl-3'>Backend developer</p>
                            </label>
                            <label className='flex items-center justify-start '>
                                <Field
                                    type='radio'
                                    name='position'
                                    id='designer'
                                    value='designer'
                                    className='peer appearance-none'
                                    tabIndex={0}
                                />
                                <span className='colors relative h-5 w-5 rounded-full border-[1px] border-[#D0CFCF] transition-colors after:absolute after:top-1/2 after:left-1/2 after:h-[10px] after:w-[10px] after:-translate-y-1/2 after:-translate-x-1/2 after:rounded-full after:bg-transparent after:transition-colors peer-checked:border-blue peer-checked:after:bg-blue'></span>
                                <p className='pl-3'>Designer</p>
                            </label>
                            <label className='flex items-center justify-start'>
                                <Field type='radio' name='position' id='qa' value='qa' className='peer appearance-none' tabIndex={0} />
                                <span className='colors relative h-5 w-5 rounded-full border-[1px] border-[#D0CFCF] transition-colors after:absolute after:top-1/2 after:left-1/2 after:h-[10px] after:w-[10px] after:-translate-y-1/2 after:-translate-x-1/2 after:rounded-full after:bg-transparent after:transition-colors peer-checked:border-blue peer-checked:after:bg-blue'></span>
                                <p className='pl-3'>QA</p>
                            </label>
                        <ErrorMessage className='mt-1 pl-4 text-red' name='position' component='div'/>
                        </fieldset>
                        <div className='relative mt-12 flex w-full'>
                            <label
                                htmlFor='file'
                                tabIndex={0}
                                className={classFileLabel(formik.touched.photo,formik.errors.photo)}
                            >
                                Upload
                            </label>
                            <label
                                htmlFor='file'
                                className={classFile(formik.touched.photo,formik.errors.photo)}
                            >
                                {fileName}
                            </label>
                            <Field type='file' value={undefined}  id='file' name='photo' className='hidden' accept='image/jpeg, image/png'
                            // onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            //         if (e.target.files && e.target.files[0]) {
                            //             setFileName(e.target.files[0].name);
                            //             formik.setFieldValue('file', e.target.files[0])
                            //         }
                            //         // formik.handleChange(e);
                            //     }
                            // }
                            onChange={( e: React.ChangeEvent<HTMLInputElement> ) => {
                                if (e.currentTarget.files && e.currentTarget.files[0]) {
                                    const file = e.currentTarget.files[0];
                                    onInputFileName(file.name);
                                    const reader = new FileReader();
                                    if (file) {
                                        // reader.onloadend = () => {
                                        //     setFile({
                                        //     file,
                                        //     previewURI: reader.result
                                        //     });
                                        // };
                                        reader.readAsDataURL(file);
                                        formik.setFieldValue("photo", file);
                                    }
                                }
                              }
                            }
                            />
                        </div>
                        <ErrorMessage className='mt-1 pl-4 text-red self-start' name='photo' component='div'/>
                        {isError ? <div className={classError()}>{store.message}</div> : null }
                        <button type="submit" disabled={ formik.isSubmitting ? true : false }
                            className={classButton(formik.isSubmitting)}>
                            Sign up
                            <Preloader w='10px' h='10px' visible={formik.isSubmitting ? true : false}/>
                        </button>
                    </Form>
                )}
                </Formik>
                <section className={`mx-auto mt-[50px] flex max-w-sm flex-col items-center justify-center ${thank ? 'visible': 'hidden'}`} ref={parentThank}>
                <div className='container'>
                    <div className='text-center font-normal text-[40px] leading-10'>User successfully registered</div>
                        <Image src='/img/success-image.svg' alt='success' width={328} height={290} className='mt-[50px] w-full h-full object-cover object-center'/>
                    </div>
            </section>  
        </>
    )
}

export default ContactForm;