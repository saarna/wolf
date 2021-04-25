import { Selector, t} from 'testcafe'
import {ClientFunction} from 'testcafe'

fixture `Gymwolf assignment`

.page`https://www.gymwolf.com/staging`


test(`Test 1 - Warm up, searching certain exercise`, async t=>{

const buttonSearch=Selector('li').sibling(1)
const fieldSearch=Selector('.dropdown-menu')

await t.click(buttonSearch)
await t.click(fieldSearch)
await t.typeText(fieldSearch, "Biitseps kangiga seistes", {paste:true})
await t.pressKey('enter')
await t.wait(4000)

//Assertion 1 - Possible to find certain exercise called "Biitseps kangiga seistes"
await t.expect(Selector('.col-md-12').innerText).contains('Biitseps kangiga seistes')

})

test(`Test 2 - Sign in or registration is needed when choosing trainer`, async t=>{

const nuppUuriLahemaltPersonalT=Selector('.btn').withText('Uuri lähemalt')
const modaalRegaJaLogin=Selector('#signup')

//Assertion 1 - Are we on the correct page, link contains word staging
await t.expect(await Selector('a').getAttribute('href')).contains('staging')

await t.click(nuppUuriLahemaltPersonalT)

//Assertion 2 - On the Online personal trainer we have following word = Personaaltreener
await t.expect(Selector('.trainer-header').innerText).contains('Personaaltreener')

await t.click(Selector('.btn').withText('Vali see treener'))
//Assertion 3 - Choosing trainer will ask to login or register
await t.expect(Selector(modaalRegaJaLogin).visible).notOk()

})

test.only(`TEST 3 - Registration process`, async t=>{

//Main const
const registerLink=Selector('.show-signup-form-from-menu')
const buttonRegister=Selector('.btn').withText('Registreeru')
const inputRegEmail=Selector('#landing-page-signup-form')
//Registration const
const regName=Selector('#gwn')
const regGender=Selector('#gender_male')
const monthSelect=Selector('.col-xs-3').withText('- Kuu -')
const regMonthChoice=monthSelect.find('option')
const daySelect=Selector('.col-xs-3').withText('- Päev -')
const regDayChoice=daySelect.find('option')
const yearSelect=Selector('.col-xs-3').withText('- Aasta -')
const regYearChoice=yearSelect.find('option')
const regPass=Selector('#gwp')
const regPass2=Selector('#gwp2')
const regUnits=Selector('#gwunits')
const regTimezone=Selector('#timezone')
const regMyGym=Selector('#mygym')
const regProfileDesc=Selector('#user-description')
const regProfileLink=Selector('#gwun')

await t.click(registerLink)
//Assertion 1 - Registration buttons visible
await t.expect(Selector('.btn').withText('Sinu E-maili aadress').visible).notOk()
await t.expect(Selector('.btn').withText('Sisene Facebooki abil').visible).notOk()
await t.click(buttonRegister)

//Assertion 2 - Error message visible when trying to register without entering e-mail
await t.expect(Selector('.alert').innerText).contains('Vigane e-maili aadress')

await t.click(Selector('.btn').withText('Alusta tasuta'))

await t.typeText(inputRegEmail, "oee00@gym.ee", {paste:true})
await t.wait(3000)
await t.click(buttonRegister)
await t.wait(4000)

//Assertion 3 - After registration transferred to profile edit page
await t.expect(Selector('.menu-name-label').visible).ok()

//Inserting values
await t.typeText(regName, "Okfffd", {paste:true})
await t.click(regGender)
await t.click(monthSelect)
await t.click(regMonthChoice.withText('June'))
await t.click(daySelect)
await t.click(regDayChoice.withText('8'))
await t.click(yearSelect)
await t.click(regYearChoice.withText('1986'))
await t.click(regPass)
await t.typeText(regPass, "Pass", {paste:true})
await t.click(regPass2)
await t.typeText(regPass2, "Pass", {paste:true})
await t.click(regUnits)
await t.pressKey('k')
await t.click(regTimezone)
await t.pressKey('t a')
await t.typeText(regMyGym, "Viimsi SPA", {paste:true})
await t.typeText(regProfileDesc, "No pain no gain", {paste:true})
await t.typeText(regProfileLink, "testlink9393", {paste:true})
await t.pressKey('tab')
await t.pressKey('enter')

//Assertion 4 - After pressing Salvesta get confirmation that data savae
await t.expect(Selector('.alert').innerText).contains('Andmed uuendatud')

})