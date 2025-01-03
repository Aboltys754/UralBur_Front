export default function Form() {
  return <div className="col-md-6 mb-5 order-2">
  <form action="#" method="post" onSubmit={e => _onSubmit(e)}>
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
        <textarea name="message" id="message" className="form-control " cols="30" rows="8"></textarea>
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

function _onSubmit(e) {
  e.preventDefault();
}