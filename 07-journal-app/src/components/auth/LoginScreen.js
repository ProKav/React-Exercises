import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { login } from '../../actions/auth'

export const LoginScreen = () => {
	const dispatch = useDispatch()

	const [formValues, handleInputChange] = useForm({
		email: 'kamilo923@hotmail.com',
		password: '123456',
	})

	const { email, password } = formValues

	const handleLogin = e => {
		e.preventDefault()
		dispatch(login(12345, 'Andres'))
	}

	return (
		<>
			<h3 className='auth__title'>Login</h3>

			<form onSubmit={handleLogin}>
				<input
					className='auth__input'
					type='text'
					placeholder='Email'
					name='email'
					autoComplete='off'
					value={email}
					useForm
					onChange={handleInputChange}
				/>
				<input
					className='auth__input'
					type='password'
					placeholder='Password'
					name='password'
					autoComplete='off'
					value={password}
					useForm
					onChange={handleInputChange}
				/>
				<button type='submit' className='btn btn-primary btn-block'>
					Login
				</button>

				<div className='auth__social-networks'>
					<p>Login With Social Networks</p>
					<div className='google-btn'>
						<div className='google-icon-wrapper'>
							<img
								className='google-icon'
								src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
								alt='google button'
							/>
						</div>
						<p className='btn-text'>
							<b>Sign in with google</b>
						</p>
					</div>
					<Link to='/auth/register' className='link'>
						Create new account
					</Link>
				</div>
			</form>
		</>
	)
}
