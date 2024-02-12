import dangoCat from "../../assets/dango-cat.png";

const Header = () => {
  return (
    <header className="headerBackground">
      <div className="header">
        <img
          id="dangocat"
          src={dangoCat}
          alt="Dango Cat"
          style={{ width: "50px", float: "left", marginLeft: "30px" }}
        />
        <img
          id="dangocat"
          src={dangoCat}
          alt="Dango Cat"
          style={{ width: "50px", float: "right", marginRight: "30px" }}
        />
        <h1 className="headertitle">Anie-Mates</h1>
        <h3>Where you can find your next adventure!</h3>
      </div>
    </header>
  );
};

export default Header;
