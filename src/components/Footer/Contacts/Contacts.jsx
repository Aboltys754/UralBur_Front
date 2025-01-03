export default function Contacts({ contacts }) {
  return <div className="col-md-5 mb-5 pl-md-5" id="contacts">
    <h3>Контакты</h3>
    <ul className="list-unstyled footer-link">

      {contacts.map((e, i) => <li key={i} className="d-block">
        <span className="d-block">{_getTitle(e.alias)}:</span>
        <span>{e.value}</span>
      </li>)}

    </ul>
  </div>
}

function _getTitle(v) {
  switch (v) {
    case "address":
      return "Адрес";
    case "telephone":
      return "Телефон";
    case "email":
      return "Email";
  }
}
