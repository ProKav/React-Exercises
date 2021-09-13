/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
	startLoadingNotes,
	startNewNote,
	startSaveNote,
	startUploading,
} from '../../actions/notes'
import { db } from '../../firebase/firebase-config'
import { types } from '../../types/types'
import { fileUpload } from '../../helpers/fileUpload'

jest.mock('../../helpers/fileUpload', () => {
	return {
		fileUpload: () => {
			return Promise.resolve('https://hola-mundo.com/cosa.jpg')
		},
	}
})

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
	auth: {
		uid: 'Testing',
	},

	notes: {
		active: {
			id: 'OfDtdLsuVQPFu11rO0IK',
			title: 'Holis',
			body: 'KavDev',
		},
	},
}

let store = mockStore(initState)

describe('Test with actions in notes', () => {
	beforeEach(() => {
		store = mockStore(initState)
	})

	test('Should create a new note in StartNewNote', async () => {
		await store.dispatch(startNewNote())

		const actions = store.getActions()

		expect(actions[0]).toEqual({
			type: types.notesActive,
			payload: {
				id: expect.any(String),
				title: '',
				body: '',
				date: expect.any(Number),
			},
		})

		expect(actions[1]).toEqual({
			type: types.notesAddNew,
			payload: {
				id: expect.any(String),
				title: '',
				body: '',
				date: expect.any(Number),
			},
		})

		const docId = actions[0].payload.id
		await db.doc(`/Testing/journal/notes/${docId}`).delete()
	})

	test('startLoadingNotes Should be charge notes', async () => {
		await store.dispatch(startLoadingNotes('Testing'))

		const actions = store.getActions()

		expect(actions[0]).toEqual({
			type: types.notesLoad,
			payload: expect.any(Array),
		})

		const expected = {
			id: expect.any(String),
			title: expect.any(String),
			body: expect.any(String),
			date: expect.any(Number),
		}

		expect(actions[0].payload[0]).toMatchObject(expected)
	})

	test('startSaveNote should update note', async () => {
		const note = {
			id: 'OfDtdLsuVQPFu11rO0IK',
			title: 'Hello',
			body: 'My World',
		}

		await store.dispatch(startSaveNote(note))

		const actions = store.getActions()

		expect(actions[0].type).toBe(types.notesUpdated)

		const docRef = await db.doc(`/Testing/journal/notes/${note.id}`).get()

		expect(docRef.data().title).toBe(note.title)
	})

	test('startUploading should update url of entry', async () => {
		const file = []

		await store.dispatch(startUploading(file))

		const docRef = await db
			.doc('/Testing/journal/notes/OfDtdLsuVQPFu11rO0IK')
			.get()
		expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg')
	})
})
