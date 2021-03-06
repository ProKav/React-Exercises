import React from 'react'
import { useDispatch } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'
import { useSelector } from 'react-redux'

export const NotesAppBar = () => {
	const dispatch = useDispatch()
	const { active } = useSelector(state => state.notes)

	const handlePictureClick = () => {
		document.querySelector('#fileSelector').click()
	}

	const handleFileChange = e => {
		const file = e.target.files[0]
		if (file) {
			dispatch(startUploading(file))
		}
	}

	const handleSave = () => {
		dispatch(startSaveNote(active))
	}

	return (
		<div className='notes__appbar'>
			<span>17 de Julio de 2021</span>

			<input
				id='fileSelector'
				name='file'
				type='file'
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>

			<div>
				<button className='btn' onClick={handlePictureClick}>
					Picture
				</button>
				<button className='btn' onClick={handleSave}>
					Save
				</button>
			</div>
		</div>
	)
}
