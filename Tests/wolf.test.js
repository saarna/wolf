import { Selector, t} from 'testcafe'
import {ClientFunction} from 'testcafe'

fixture `Gymwolf assignment`

.page`https://www.gymwolf.com/staging`

test.skip(`Esimene test - Lehel ringi liikumine`, async t=>{

const nuppUuriLahemaltPersonalT=Selector('.btn').withText('Uuri lähemalt')
const modaalRegaJaLogin=Selector('#signup')
//Assertion 1 - Kontrollime, et oleme õigel lehel, link sisaldab sõna staging
await t.expect(await Selector('a').getAttribute('href')).contains('staging')

await t.click(nuppUuriLahemaltPersonalT)

//Assertion 2 - Personaaltreeneri lehel on päis Personaaltreener
await t.expect(Selector('.trainer-header').innerText).contains('Personaaltreener')

await t.click(Selector('.btn').withText('Vali see treener'))
//Assertion 3 - Valides treeneri avaneb modaal, kus saab regada või sisse logida
await t.expect(Selector(modaalRegaJaLogin).visible).notOk()



})

test(`Esimene test - Registration process`, async t=>{

const registerLink=Selector('.show-signup-form-from-menu')
const buttonRegister=Selector('.btn').withText('Registreeru')
const inputRegEmail=Selector('#landing-page-signup-form')

await t.click(registerLink)
//Assertion 1 - registration buttons visible
await t.expect(Selector('.btn').withText('Sinu E-maili aadress').visible).notOk()
await t.expect(Selector('.btn').withText('Sisene Facebooki abil').visible).notOk()
await t.click(buttonRegister)
//Assertion 2 - error message visible when trying to register without entering e-mail
await t.expect(Selector('.alert').innerText).contains('Vigane e-maili aadress')

//await t.click(inputRegEmail)
await t.typeText(inputRegEmail, "test@test.ee", {paste:true})



})