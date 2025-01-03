export default function Contact({ contacts }) {
  return <div className="col-md-6 order-2 mb-5">
    <div className="row justify-content-right">
      <div className="col-md-8 mx-auto contact-form-contact-info">
        {contacts.map((e, i) => <p key={i} className="d-flex">
          {_makeIcon(e)}
          <span>{e.value}</span>
        </p>)}
      </div>
    </div>
  </div>
}

function _makeIcon(e) {
  switch (e.alias) {
    case "address":
      return <span className="ion-ios-location icon mr-5"></span>;
    case "telephone":
      return <span className="ion-ios-telephone icon mr-5"></span>;
    case "email":
      return <span className="ion-android-mail icon mr-5"></span>;
  }
}