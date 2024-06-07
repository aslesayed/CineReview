import "./profil.css";

const fakeData = [
  {
    id: 1,
    image: "https://via.placeholder.com/200x300.png?text=Movie+1",
    firstname: "Asle",
    lastname: "Sayeda",
    email: "saimasayeda786@gmail.com",
  },
];

function Profil() {
  return (
    <div className="container-form-profil">
      {fakeData.map((user) => (
        <div key={user.id} className="form-profil">
          <div className="profil-picture-container">
            <img
              src={user.image}
              alt="profil-picture"
              className="profil-image"
            />
          </div>
          <div className="name-profilzz">{user.firstname}</div>
          <form className="form-body-profil">
            <label className="form-profil-label">Firstname</label>
            <input
              className="form-input-profil"
              type="text"
              required
              value={user.firstname}
            />
            <label className="form-profil-label">Lastname</label>
            <input
              className="form-input-profil"
              type="text"
              required
              value={user.lastname}
            />
            <label className="form-profil-label">Phone/Email</label>
            <input
              className="form-input-profil"
              type="text"
              required
              value={user.email}
            />
          </form>
          <p className="modify-profil">Modify informations</p>
        </div>
      ))}
    </div>
  );
}

export default Profil;
