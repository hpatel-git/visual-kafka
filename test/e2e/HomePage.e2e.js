/* eslint-disable */
import { ClientFunction, Selector } from 'testcafe'
import { getMainMenuItems } from 'testcafe-browser-provider-electron'
import { getPageUrl } from './helpers'
// import ConnectionPage from '../../app/containers/ConnectionPage'
import AddIcon from '@material-ui/icons/Add'
import { Fab } from '@material-ui/core'

const getPageTitle = ClientFunction(() => document.title)
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

test('Should have all menu items', async t => {
  const menuItems = (await getMainMenuItems()).map(item => item.label)
  await t.expect(menuItems).eql(['Visual Kafka', 'Edit', 'View', 'Window', 'Help']);
});
