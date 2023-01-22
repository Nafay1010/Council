import { useState } from "react";
import { useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Counsil = () => {
  const navigate = useNavigate();
  const { users, dispatch } = useUserContext();
  const { user } = useAuthContext();
  const { email } = JSON.parse(localStorage.getItem("User"));
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [budget, setBudget] = useState(0);
  const [interest, setInterest] = useState("");
  const [degree_program, setDegree_program] = useState("");
  const [preferred_location, setPreferred_location] = useState("");
  const [fileData, setfileData] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/home" + email, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_USERS", payload: json });
      }
    };

    if (user) {
      fetchUsers();
    }
    fetchUsers();
  }, [dispatch, user, email]);

  const fileChangeHandler = (e) => {
    setfileData(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("Loading...");
    const CNIC = String(users.map((item) => item.CNIC));
    const data = new FormData();
    data.append("image", fileData);
    data.append(
      "data",
      JSON.stringify({
        budget,
        interest,
        degree_program,
        preferred_location,
        CNIC,
      })
    );
    const fetchrecommendation = async () => {
      const response = await fetch("/single", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        setError("");
        const json = await response.json();
        navigate("/recommendation", {
          state: { recommendation: json },
        });
      } else {
        setError("Error Occured!");
        setSuccess("");
      }
    };

    fetchrecommendation();
  };
  return (
    <div className="counsil-content">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <fieldset className="counsil-field">
          <h1>Get Recommendation</h1>
          <div className="field">
            <label htmlFor="Budget">Budget</label>
            <br />
            <br />
            <input
              type="range"
              id="Budget"
              name="Budget"
              min="0"
              max="20000000"
              step="100000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            <label htmlFor="Budget" className="labelbudget">
              {budget} PKR
            </label>
            <br />
            <br />
            <label>Hobbies/Interest</label>
            <br />
            <br />
            <input
              type="text"
              required
              name="interest"
              placeholder="Gaming, Sports, Reading, Writing, etc..."
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
            <br />
            <br />
            <label>Degree Program</label>
            <br />
            <br />
            <select
              id="degree_program"
              name="degree_program"
              value={degree_program}
              onChange={(e) => setDegree_program(e.target.value)}
            >
              <option value="">--Choose--</option>
              <option value="BSCS">Bachelors in Computer Science (BSCS)</option>
              <option value="BSIT">
                Bachelors in Information Technology (BSIT)
              </option>
              <option value="BSDS">Bachelors in Data Science (BSDS)</option>
              <option value="BSAI">
                Bachelors in Artificial Intelligence (BSAI)
              </option>
              <option value="BSSE">
                Bachelors in Software Engineering (BSSE)
              </option>
              <option value="BSEE">
                Bachelors in Electrical Engineering (BSEE)
              </option>
              <option value="BSME">
                Bachelors in Mechanical Engineering (BSSE)
              </option>
              <option value="BSChe">
                Bachelors in Chemical Engineering (BSChe)
              </option>
              <option value="BEL">
                Bachelors in Electronics Engineering (BEL)
              </option>
              <option value="BSCE">
                Bachelors in Civil Engineering (BSSE)
              </option>
              <option value="BBA">
                Bachelors in Business Administration (BBA)
              </option>
              <option value="BBAF">BBA Finance</option>
              <option value="Medical">Medical</option>
            </select>
            <br />
            <br />
            <label>Preferred Location</label>
            <br />
            <br />
            <select
              id="preferred_location"
              name="preferred_location"
              value={preferred_location}
              onChange={(e) => setPreferred_location(e.target.value)}
            >
              <option value="">--Choose--</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Risalpur">Risalpur</option>
            </select>
            <br />
            <br />
            <label htmlFor="file">Upload Transcript</label>
            <br />
            <br />
            <input
              type="file"
              name="file"
              onChange={fileChangeHandler}
              className="file-input"
            />
            <br />
            <br />
            <div className="btn">
              <button>Submit</button>
              {success ? (
                <div className="success_counsil">{success}</div>
              ) : (
                error && <div className="error">{error}</div>
              )}
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Counsil;