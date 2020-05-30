interface ITest {
    id: number
    name: string
    approved: boolean
}

let sampleData: Array<ITest> = [{
    id: 1,
    name: "first",
    approved: false
},{
    id: 2,
    name: "second",
    approved: true
}]

const getTests = ({ response }: { response: any }) => {
    response.body = sampleData
}

const getTest = ({ params, response }: { params: { name: string }; response: any}) => {
    const test: ITest | undefined = searchTestByName(params.name)
    if (test) {
        response.status = 200
        response.body = test
    } else {
        response.status = 404
        response.body = { messsage: `test not found`}
    }
}

const addTest = async ({ request, response }: { request: any; response: any}) => {
    const body = await request.body()
    const test: ITest = body.value
    sampleData.push(test)
    response.body = { message: 'OK' }
    response.status = 200
}

const updateTest = async ({ params, request, response }: { params: { name: string }; request: any; response: any }) => {
    let test: ITest | undefined = searchTestByName(params.name)
    if (test) {
      const body = await request.body()
      const updateInfos: { name?: string; approved?: boolean } = body.value
      test = { ...test, ...updateInfos}
      sampleData = [...sampleData.filter(test => test.name !== params.name), test]
      response.status = 200
      response.body = { message: 'OK' }
    } else {
      response.status = 404
      response.body = { message: `Test not found` }
    }  
  }

  const deleteTest = ({ params, response }: { params: { name: string }; response: any }) => {
    sampleData = sampleData.filter(test => test.name !== params.name)
    response.body = { message: 'OK' }
    response.status = 200
  }

  const searchTestByName = (name: string): ( ITest | undefined ) => sampleData.filter(test => test.name === name)[ 0 ]

  export { getTests, getTest, addTest, updateTest, deleteTest }