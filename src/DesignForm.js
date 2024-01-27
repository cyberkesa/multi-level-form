import React, { useState } from "react";
import "./DesignForm.css";

function DesignForm() {
  const [formData, setFormData] = useState({
    step: 1,
    category: "",
    item: "",
    name: "",
    email: "",
    additionalQuestion1: "",
    additionalQuestion2: "",
    additionalQuestion3: "",
    additionalQuestion4: "",
  });

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
    goToNextStep();
  };

  const handleItemChange = (value) => {
    setFormData({ ...formData, item: value });
    goToNextStep();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const alertData = (e) => {
    e.preventDefault();
    console.log(formData);
    alert(JSON.stringify(formData, null, 2));
    setFormData({ ...formData, step: 9 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const goToNextStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      step: prevData.step < 9 ? prevData.step + 1 : prevData.step,
    }));
  };

  const goToPrevStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      step: prevData.step > 1 ? prevData.step - 1 : prevData.step,
    }));
  };

  const ArtCard = ({ type, image, label }) => (
    <div className="art-card" onClick={() => handleCategoryChange(type)}>
      <img src={image} alt={label} />
      <p>{label}</p>
    </div>
  );

  const renderStep = () => {
    switch (formData.step) {
      case 1:
        return (
          <div>
            <p>What type of art are you interested in?</p>
            <div className="grid-cards">
              <ArtCard type="3D-Signs" label="Custom 3D Bussiness Signs" />
              <ArtCard type="B" label="Acrylic Prints" />
              <ArtCard type="C" label="Canvas Prints" />
              <ArtCard type="D" label="Trophies" />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <p>What item are you interested in?</p>
            <div className="grid-cards">
              <ArtCard type="A" label="Option A" />
              <ArtCard type="B" label="Option B" />
              <ArtCard type="C" label="Option C" />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <p>Name:</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 4:
        return (
          <div>
            <p>Email:</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <button onClick={goToPrevStep}>Back</button>
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 5:
        return (
          <div>
            <p>Share your special requests! 📝✨(optional)</p>
            <input
              type="text"
              name="additionalQuestion1"
              value={formData.additionalQuestion1}
              onChange={handleChange}
            />
            <button onClick={goToPrevStep}>Back</button>
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 6:
        return (
          <div>
            <p>Let's see your design!📎🎨 (optional)</p>
            <input
              type="text"
              name="file"
              value={formData.file}
              onChange={handleChange}
            />
            <button onClick={goToPrevStep}>Back</button>
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 7:
        return (
          <div>
            <p>Q</p>
            <input
              type="text"
              name="additionalQuestion3"
              value={formData.additionalQuestion3}
              onChange={handleChange}
            />
            <button onClick={goToPrevStep}>Back</button>
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 8:
        return (
          <div>
            <p>Additional Question 4:</p>
            <input
              type="text"
              name="additionalQuestion4"
              value={formData.additionalQuestion4}
              onChange={handleChange}
            />
            <button onClick={goToPrevStep}>Back</button>
            <button onClick={alertData}>Submit</button>
          </div>
        );
      case 9:
        return (
          <div>
            <p>
              ✨ Thank you for your request! Within the next 24 hours, we’ll be
              in touch with a personalized quote and a mock-up tailored just for
              you. We’re excited to bring your vision to life!
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return <form onSubmit={handleSubmit}>{renderStep()}</form>;
}

export default DesignForm;