export default function Form() {
  const [disabled, setDisabled] = React.useState(false);

  if(disabled) {
    return <div className="col-md-6 mb-5 order-2">
      <div className="col-md-8 mx-auto contact-form-contact-info">
        <p className="d-flex">
          <span className="ion-chatbubble-working icon mr-5"></span>
          <span>Благодарим Вас за проявленный интерес к нашей продукции, 
            но в настоящее время форма обратной связи не работает. 
            Вы можете написать нам письмо со своего рабочего email или позвонить по телефону, указанному на этой странице.</span>
        </p>
      </div>
    </div>
  }
 
  return <div className="col-md-6 mb-5 order-2">
  <form action="#" method="post" onSubmit={e => _onSubmit(e, setDisabled)}>
    <div className="row">
      <div className="col-md-6 form-group">
        <label htmlFor="name">Имя</label>
        <input type="text" id="name" className="form-control "/>
      </div>
      <div className="col-md-6 form-group">
        <label htmlFor="phone">Телефон</label>
        <input type="text" id="phone" className="form-control "/>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 form-group">

      </div>
    </div>
    <div className="row">
      <div className="col-md-12 form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" className="form-control "/>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 form-group">
        <label htmlFor="message">Напишите нам</label>
        <textarea id="message" className="form-control " cols="30" rows="8"></textarea>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 form-group">
        <input type="submit" value="Отправить" className="btn btn-primary px-3 py-3"/>
      </div>
    </div>
  </form>
</div>
}

function _onSubmit(e, setDisabled) {
  e.preventDefault();
  setDisabled(true);
}