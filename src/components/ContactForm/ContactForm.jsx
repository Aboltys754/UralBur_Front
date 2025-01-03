import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";
import Form from "./Form/Form.js";
import Contact from "./Contact/Contact.js";

connector.add("ContactForm");

function ContactForm({ contacts }) {
  React.useEffect(() => connector.del("ContactForm"))

  return <section className="section">
    <div className="container">
      <div className="row">
        <Form />
        <Contact contacts={contacts} />
      </div>
    </div>
  </section>
}

fetch(`${serviceHost("mcontent")}/api/mcontent/contact/public`)
  .then(async response => {
    const res = await response.json();
    return res;
  })
  .then(res => {
    const root = ReactDOM.createRoot(document.getElementById("contactForm"));
    root.render(<ContactForm contacts={res} />);
  })