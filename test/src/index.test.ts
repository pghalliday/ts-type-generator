import HelloWorld from "../../src"

describe('HelloWorld', () => {
    it('should say hello', () => {
        const helloWorld = new HelloWorld()
        helloWorld.greet().should.equal('Hello, world!')
    })
})
