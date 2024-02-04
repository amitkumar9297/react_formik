import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import KErrorMessage from "./components/KErrorMessage";

let reguexe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/

const validationSchema = yup.object({
  name: yup.string().required("name is required ! "),
  email: yup.string().required("please enter your e-mail-Id"),
  phone: yup.number().min(1000000000, "not valid phone no.").max(9999999999).required("your phone no is required!"),
  // password: yup.string().matches(`${reguexe}`, "must contain 8 character,small and capital alphabet, digits, symbol must be included").required("password is required please fill it"),
  gender: yup.string().required("please mentioned your gender"),
  date: yup.date().required("enter your date of birth please!"),
  income: yup.string().required("please enter you monthly income in rs"),
  social: yup.object().required("please enter your social links!"),
  about: yup.string().max(500, "too long").min(200, "too small").required("please enter about your self"),
  hobby: yup
    .array()
    .of(yup
      .string("string is required")
      .min(3, "too short")
      .max(20, "too long")
      .required("require")
    )
    .min(1, "atleast 1 hobby is required")
    .required("required")
});

function App() {
  return (
    <div>
      <Formik
        validationSchema={validationSchema}
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
            <br />
            <KErrorMessage name={"name"} />
            <br />

            <label>E-mail:</label>
            <Field name={"email"} type={"email"} />
            <br />
            <KErrorMessage name={"email"} />
            <br />

            <label>Ph.No:</label>
            <Field name={"phone"} type={"number"} />
            <br />
            <KErrorMessage name={"phone"} />
            <br />

            <label>Password:</label>
            <Field name={"password"} type={"password"} />
            <br />
            <KErrorMessage name={"password"} />
            <br />

            <label>Gender:</label>
            <br />
            <label>Male:</label>
            <Field name={"gender"} type={"radio"} value="male" />
            <label>Female:</label>
            <Field name={"gender"} type={"radio"} value="female" />
            <br />
            <KErrorMessage name={"gender"} />
            <br />

            <label>Date:</label>
            <Field name={"date"} type={"date"} />
            <br />
            <KErrorMessage name={"date"} />
            <br />

            <label>Income:</label>
            <Field name={"income"} as="select">
              <option>rs 0/month</option>
              <option>rs 150000/month</option>
              <option>rs 250000/month</option>
            </Field>
            <br />
            <KErrorMessage name={"income"} />
            <br />

            <label>About:</label>
            <Field name={"about"} as="textarea" />
            <br />
            <KErrorMessage name={"about"} />
            <br />

            <label>Social:</label>
            <label>facebook</label>
            <Field name={"social.facebook"} type={"text"} />
            <label>Twitter</label>
            <Field name={"social.twiter"} type={"text"} />
            <KErrorMessage name={"social"} />

            <FieldArray
              name="hobby"
              render={arrayHelpers => (
                <div>
                  {values.hobby && values.hobby.length > 0 ? (
                    values.hobby.map((friend, index) => (
                      <div key={index}>
                        <Field name={`hobby.${index}`} />
                        <KErrorMessage name={`hobby.${index}`} />
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
            <KErrorMessage name={`hobby`} />

            <br /><br />
            <button type="submit">Submit</button>
          </Form>
        )}

      </Formik>
    </div>
  );
}

export default App;
