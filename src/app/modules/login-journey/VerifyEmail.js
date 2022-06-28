import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import Http from '../../services/Http';
import {toast} from 'react-toastify';

const VerifyEmail = () => {
    const [searchParams,] = useSearchParams();
    const navigate = useNavigate()

    useEffect(() => {
        let token = searchParams.get('token');
        Http.POST('verifyEmail', '', `?token=${token}`)
            .then((res) => {
                Http.GET('userInfo')
                    .then(async (response) => {
                        let {data} = response;
                        await localStorage.setItem('userInfo', JSON.stringify(data));
                        toast.success('Verification Successful!')
                        await navigate('/activation')
                    })
                    .catch(({response}) => {
                        toast.error(response.data.message)
                    });
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
    }, [])

    return ''
}

export default VerifyEmail
