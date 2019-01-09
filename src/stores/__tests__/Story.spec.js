import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree'
import 'unfetch/polyfill'
import { reaction } from 'mobx'
import { StoryModel, UserStore } from '../Story'

it('can create a instance of a story model', () => {
  const story = StoryModel.create({
    title: 'Chronicles of Narnia',
    likes: 28,
  })

  expect(story.likes).toBe(28)
  expect(story.title).toBe('Chronicles of Narnia')
})

it('can change the title of a story', () => {
  const story = StoryModel.create({
    title: 'Chronicles of Narnia',
    likes: 28,
  })

  story.changeTitle('Narnia')
  expect(story.title).toBe('Narnia')
})

it('can create a UserStore', () => {
  const user = UserStore.create()
})

it('can fetch new stories', () => {
  const user = UserStore.create()
  user.fetchAllStories()
  console.log(user.stories)
})