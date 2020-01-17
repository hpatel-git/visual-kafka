/* eslint-disable */
import { ClientFunction, Selector } from 'testcafe'
import { getPageUrl } from './helpers'

const getPageTitle = ClientFunction(() => document.title)
const addConnectionButtonSelector = Selector('[data-tid="addConnectionButton"]')
const addConnectionButtonText = () => addConnectionButtonSelector().innerText
const assertNoConsoleErrors = async t => {
  const { error } = await t.getBrowserConsoleMessages()
  await t.expect(error).eql([])
}

fixture`Home Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors)

test('e2e', async t => {
  await t.expect(getPageTitle()).eql('Welcome to Visual Kafka')
});

test('should open window and contain expected application title', async t => {
  await t.expect(getPageTitle()).eql('Welcome to Visual Kafka')
})

test(
  'should not have any logs in console of main window',
  assertNoConsoleErrors,
)
