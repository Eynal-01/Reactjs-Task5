import React, { useState } from "react";

function CarApp() {
  const initialCars = [
    {
      id: 1,
      make: "Pagani",
      model: "Huayra R",
      price: 3000000,
      imageUrl:
        "https://res.cloudinary.com/caradvice/image/private/q_auto/v1616032798/xglmnd4m9ypbwlub8wpw.jpg",
    },
    {
      id: 2,
      make: "Rimac",
      model: "Nevera",
      price: 2800000,
      imageUrl:
        "https://static.carbuyer.com.sg/wp-content/uploads/2023/10/2023-Rimac-Nevera-Launch-Exterior-CarBuyer.com_.sg-JYT_0047.jpg",
    },
    {
      id: 3,
      make: "McLaren",
      model: "720s Spider",
      price: 326500,
      imageUrl:
        "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F02%2Fmclaren-720s-spider-open-road-review-test-drive-twitter.jpg?w=1080&cbr=1&q=90&fit=max",
    },
    {
      id: 4,
      make: "Ferrari",
      model: "LaFerrari",
      price: 1400000,
      imageUrl:
        "https://cdn.ferrari.com/cms/network/media/img/resize/64a6986324536a0022e85573-tofm_1320420_1920x1080%20centered?",
    },
  ];

  const [cars, setCars] = useState(initialCars);
  const [selectedCar, setSelectedCar] = useState(null);
  const [updatedMake, setUpdatedMake] = useState("");
  const [updatedModel, setUpdatedModel] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedImageUrl, setUpdatedImageUrl] = useState("");

  const [sortNameAscending, setSortNameAscending] = useState(true);
  const [sortPriceAscending, setSortPriceAscending] = useState(true);

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setUpdatedMake(car.make);
    setUpdatedModel(car.model);
    setUpdatedPrice(car.price);
    setUpdatedImageUrl(car.imageUrl);
  };

  const handleMakeChange = (event) => {
    setUpdatedMake(event.target.value);
  };

  const handleModelChange = (event) => {
    setUpdatedModel(event.target.value);
  };

  const handlePriceChange = (event) => {
    setUpdatedPrice(event.target.value);
  };

  const handleImageChange = (event) => {
    setUpdatedImageUrl(event.target.value);
  };

  const handleUpdateCar = () => {
    if (!selectedCar) return;

    const updatedCars = cars.map((car) =>
      car.id === selectedCar.id
        ? {
            ...car,
            make: updatedMake,
            model: updatedModel,
            price: updatedPrice,
            imageUrl: updatedImageUrl,
          }
        : car
    );

    setCars(updatedCars);
    setSelectedCar(null);
    setUpdatedMake("");
    setUpdatedModel("");
    setUpdatedImageUrl("");
    setUpdatedPrice("");
  };

  const handleDeleteCar = (carId) => {
    const updatedCars = cars.filter((car) => car.id !== carId);
    setCars(updatedCars);
  };

  const handleSortNameToggle = () => {
    setSortNameAscending(!sortNameAscending);
    const sortedCars = [...cars].sort((a, b) => {
      const nameA = a.make.toUpperCase();
      const nameB = b.make.toUpperCase();
      if (sortNameAscending) {
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else {
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      }
    });
    setCars(sortedCars);
  };

  const handleSortPriceToggle = () => {
    setSortPriceAscending(!sortPriceAscending);
    const sortedCars = [...cars].sort((a, b) => {
      if (sortPriceAscending) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setCars(sortedCars);
  };

  return (
    <div>
      <h1 style={{ marginLeft: "47%" }}>Car List</h1>
      <button
        style={{
          margin: "5%",
          marginLeft: "3%",
          width: "10%",
          height: "5vh",
          color: "white",
          backgroundColor: "deepskyblue",
          border: "none",
        }}
        onClick={handleSortNameToggle}
      >
        {sortNameAscending ? "Sort A-Z" : "Sort Z-A"}
      </button>
      <button
        style={{
          margin: "5%",
          marginLeft: "5%",
          width: "15%",
          height: "5vh",
          color: "white",
          backgroundColor: "deepskyblue",
          border: "none",
        }}
        onClick={handleSortPriceToggle}
      >
        {sortPriceAscending
          ? "Sort Price Low to High"
          : "Sort Price High to Low"}
      </button>
      <ul>
        {cars.map((car) => (
          <div
            key={car.id}
            style={{
              backgroundColor: "dimgray",
              display: "inline-block",
              margin: "50px",
              borderRadius: "15px",
            }}
          >
            <p style={{ margin: "11%", fontSize: "160%" }}>Make : {car.make}</p>
            <p style={{ margin: "11%", fontSize: "160%" }}>
              Model : {car.model}
            </p>
            <p style={{ margin: "11%", fontSize: "160%" }}>
              Price : {car.price}$
            </p>
            <img
              src={car.imageUrl}
              style={{
                width: "300px",
                height: "180px",
                margin: "10%",
                borderRadius: "12px"
              }}
            ></img>
            <button
              style={{
                margin: "10%",
                marginLeft: "14%",
                width: "25%",
                height: "5vh",
                color: "white",
                backgroundColor: "deepskyblue",
                border: "none",
                borderRadius: "12px"
              }}
              onClick={() => handleCarClick(car)}
            >
              Edit
            </button>
            <button
              style={{
                margin: "10%",
                width: "25%",
                height: "5vh",
                color: "white",
                backgroundColor: "red",
                border: "none",
                borderRadius: "12px"
              }}
              onClick={() => handleDeleteCar(car.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </ul>
      {selectedCar && (
        <div>
          <h2 style={{ margin: "1%", width: "25%" }}>Edit Car</h2>
          <br></br>
          <label
            style={{
              margin: "1%",
              width: "25%",
              height: "5vh",
              border: "none",
            }}
          >
            Make:
          </label>
          <br></br>
          <input
            style={{
              margin: "1%",
              width: "25%",
              height: "5vh",
              backgroundColor: "lightgray",
              border: "none",
            }}
            type="text"
            value={updatedMake}
            onChange={handleMakeChange}
          />
          <br></br>
          <label
            style={{
              margin: "1%",
              width: "25%",
              height: "5vh",
              border: "none",
            }}
          >
            Model:
          </label>
          <br></br>
          <input
            style={{
              margin: "1%",
              width: "25%",
              height: "5vh",
              backgroundColor: "lightgray",
              border: "none",
            }}
            type="text"
            value={updatedModel}
            onChange={handleModelChange}
          />
          <br></br>
          <label
            style={{
              margin: "1%",
              width: "25%",
              height: "5vh",
              border: "none",
            }}
          >
            Price:
          </label>
          <br></br>
          <input
            style={{
              margin: "1%",
              width: "25%",
              height: "5vh",
              backgroundColor: "lightgray",
              border: "none",
            }}
            type="text"
            value={updatedPrice}
            onChange={handlePriceChange}
          />
          <br></br>
          <label
            style={{
              margin: "1%",
              width: "25%",
              height: "5vh",
              border: "none",
            }}
          >
            Image URL:
          </label>
          <br></br>
          <input
            style={{
              margin: "1%",
              width: "25%",
              height: "5vh",
              backgroundColor: "lightgray",
              border: "none",
            }}
            type="text"
            value={updatedImageUrl}
            onChange={handleImageChange}
          />
          <br></br>
          <button
            style={{
              margin: "2%",
              width: "15%",
              height: "5vh",
              color: "white",
              backgroundColor: "red",
              border: "none",
            }}
            onClick={handleUpdateCar}
          >
            Update Car
          </button>
        </div>
      )}
    </div>
  );
}

export default CarApp;
