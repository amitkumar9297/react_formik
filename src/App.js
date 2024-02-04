import { Formik, Form, Field, FieldArray } from "formik"
function App() {
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          password: "",
          gender: "",
          date: "",
          income: "",
          about: "",
          social: {
            facebook: "",
            twitter: "",
          },
          hobby: []
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values }) => (
          <Form>

            <label>Name:</label>
            <Field name={"name"} type={"text"} />
            <br /><br />

            <label>E-mail:</label>
            <Field name={"email"} type={"email"} />
            <br /><br />

            <label>Ph.No:</label>
            <Field name={"phone"} type={"number"} />
            <br /><br />

            <label>Password:</label>
            <Field name={"password"} type={"password"} />
            <br /><br />

            <label>Gender:</label>
            <br />
            <label>Male:</label>
            <Field name={"gender"} type={"radio"} value="male" />
            <label>Female:</label>
            <Field name={"gender"} type={"radio"} value="female" />
            <br /><br />

            <label>Date:</label>
            <Field name={"date"} type={"date"} />
            <br /><br />

            <label>Income:</label>
            <Field name={"income"} as="select">
              <option>rs 0/month</option>
              <option>rs 150000/month</option>
              <option>rs 250000/month</option>
            </Field>
            <br /><br />

            <label>About:</label>
            <Field name={"about"} as="textarea" />
            <br /><br />

            <label>Social:</label>
            <label>facebook</label>
            <Field name={"social.facebook"} type={"text"} />
            <label>Twitter</label>
            <Field name={"social.twiter"} type={"text"} />

            <FieldArray
              name="hobby"
              render={arrayHelpers => (
                <div>
                  {values.hobby && values.hobby.length > 0 ? (
                    values.hobby.map((friend, index) => (
                      <div key={index}>
                        <Field name={`hobby.${index}`} />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                        >
                          +
                        </button>
                      </div>
                    ))
                  ) : (
                    <button type="button" onClick={() => arrayHelpers.push('')}>
                      {/* show this when user has removed all hobby from the list */}
                      Add a hobby
                    </button>
                  )}
                </div>
              )}
            />

            <br /><br />
            <button type="submit">Submit</button>
          </Form>
        )}

      </Formik>
    </div>
  );
}

export default App;
