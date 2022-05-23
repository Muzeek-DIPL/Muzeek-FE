import imageCompression from "browser-image-compression";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Formik } from "formik";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";
import { putUpdateUserProfile } from "../../network/put";
import { app } from "../../thirdparties/firebase/firebase";
import { validateForm } from "../../utils/helpers";
// import { login } from "../../store/loginSlice";
import styles from "./Profile.module.css";

export default function Profile() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const onChangeImage = (e) => {
    if (app) {
      const file = e.target.files[0];
      const storageRef = getStorage();
      const fileRef = ref(storageRef, file.name);
      setLoadingUpload(true);
      imageCompression(file, compressionOption).then((compressedFile) => {
        uploadBytes(fileRef, compressedFile).then(() => {
          getDownloadURL(fileRef)
            .then((url) => {
              setForm({ ...form, img_link: url });
            })
            .then(() => {
              setLoadingUpload(false);
            });
        });
      });
    }
  };

  const onClickEdit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const onClickSave = (e) => {
    e.preventDefault();
    const messages = validateForm(undefined, undefined, form);
    setErrorMsg({ ...errorMsg, ...messages });
    const invalidFields = Object.keys(messages).filter(
      (key) => messages[key] !== "" && key !== "about"
    );
    if (invalidFields.length === 0) {
      updateUser({
        variables: {
          ...form,
          id,
          username,
          commenter_img: form.img_link,
        },
      });
      dispatch(login({ ...reduxData, imgLink: form.img_link }));
      setIsEditing(!isEditing);
    }
  };

  return (
    <div>
      <div className="container py-4 ">
        <h2 className="fw-bolder">Profile Detail</h2>
        {isLoading ? (
          <div className="position-absolute top-50 start-50 translate-middle">
            <Spinner />
          </div>
        ) : (
          <>
            <Formik
              initialValues={{
                img_link: user.img_link,
                full_name: user.full_name,
                location: user.location,
                instrument: user.instrument,
                phone: user.phone,
                email: user.email,
                about: user.about,
              }}
              validate={(values) => {
                const exceptionFields = ["img_link", "instrument", "about"];
                return validateForm(values, exceptionFields);
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log("masuk submit");
                putUpdateUserProfile(
                  values,
                  setSubmitting,
                  setFetchError,
                  setIsEditing
                );
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form
                  className="d-flex flex-column flex-md-row mt-5 justify-content-center"
                  onSubmit={handleSubmit}
                >
                  <label className="pe-md-4" htmlFor="img-input">
                    {loadingUpload ? (
                      <div
                        className="d-block m-auto"
                        style={{ width: "360px" }}
                      >
                        <Spinner />
                        <p className="text-center" style={{ color: "#f2af02" }}>
                          Uploading image...
                        </p>
                      </div>
                    ) : (
                      <img
                        src={values.img_link}
                        alt="profile"
                        className={`${styles.profile} rounded`}
                        style={
                          !isEditing || loadingUpload
                            ? { cursor: "default" }
                            : { cursor: "pointer" }
                        }
                      />
                    )}

                    <input
                      className="d-none"
                      type="file"
                      id="img-input"
                      disabled={!isEditing || loadingUpload}
                      onChange={onChangeImage}
                    />
                  </label>

                  <div className="w-100 d-flex flex-column mt-4 mt-md-0">
                    <Form.Group className="fw-bolder fs-5 mb-3">
                      <Form.Label>Nama Lengkap</Form.Label>
                      <Form.Control
                        value={values.full_name}
                        name="full_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.full_name}
                        type="text"
                        disabled={!isEditing}
                        className={
                          styles.input +
                          " rounded-0 border-top-0 border-end-0 border-start-0 shadow-none"
                        }
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="fw-normal fs-6"
                      >
                        {errors.full_name &&
                          touched.full_name &&
                          errors.full_name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="fw-bolder fs-5 mb-3">
                      <Form.Label>Lokasi</Form.Label>
                      <Form.Control
                        value={values.lokasi}
                        name="lokasi"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.lokasi}
                        type="text"
                        disabled={!isEditing}
                        className={
                          styles.input +
                          " rounded-0 border-top-0 border-end-0 border-start-0 shadow-none"
                        }
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="fw-normal fs-6"
                      >
                        {errors.lokasi && touched.lokasi && errors.lokasi}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="fw-bolder fs-5 mb-3">
                      <Form.Label>Instrumen</Form.Label>
                      <Form.Select
                        disabled={!isEditing}
                        className={
                          styles.input +
                          " rounded-0 border-top-0 border-end-0 border-start-0 shadow-none"
                        }
                      >
                        <option>-</option>
                        <option value="Vokal">Vokal</option>
                        <option value="Gitar">Gitar</option>
                        <option value="Bass">Bass</option>
                        <option value="Brass">Brass</option>
                        <option value="Perkusi">Perkusi</option>
                        <option value="Piano">Piano</option>
                        <option value="Strings">Strings</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="fw-bolder fs-5 mb-3">
                      <Form.Label>No. Handphone</Form.Label>
                      <Form.Control
                        value={values.phone}
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.phone}
                        type="number"
                        disabled={!isEditing}
                        className={
                          styles.input +
                          " rounded-0 border-top-0 border-end-0 border-start-0 shadow-none"
                        }
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="fw-normal fs-6"
                      >
                        {errors.phone && touched.phone && errors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="fw-bolder fs-5 mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        value={values.email}
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.email}
                        type="email"
                        disabled={!isEditing}
                        className={
                          styles.input +
                          " rounded-0 border-top-0 border-end-0 border-start-0 shadow-none"
                        }
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="fw-normal fs-6"
                      >
                        {errors.email && touched.email && errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="fw-bolder fs-5 mb-3">
                      <Form.Label>Tentang</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={values.about}
                        name="about"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        disabled={!isEditing}
                        className={
                          styles.input +
                          " rounded-0 border-top-0 border-end-0 border-start-0 shadow-none"
                        }
                      />
                    </Form.Group>

                    {!isEditing ? (
                      <Button
                        variant="outline-primary ms-auto"
                        className="rounded py-2 px-3"
                        onClick={onClickEdit}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        variant="primary ms-auto"
                        className="rounded py-2 px-3"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Spinner
                            variant="light"
                            animation="border"
                            size="sm"
                            aria-hidden="true"
                          />
                        ) : (
                          "Save"
                        )}
                      </Button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>

            <div className="d-flex gap-3 justify-content-center py-4">
              <Button
                variant={user.published ? "primary" : "secondary"}
                className="rounded py-2 px-3"
                onClick={() => {
                  navigate(`/musician/${userId}`);
                }}
                disabled={!user.published}
              >
                View Page
              </Button>
              <Button
                variant={user.published ? "outline-primary" : "primary"}
                className="rounded py-2 px-3"
                onClick={() => setOpenConfirmation(true)}
              >
                {user.published ? "Unpublish Profile" : "Publish Profile"}
              </Button>
            </div>
          </>
        )}
      </div>

      <ConfirmationModal
        show={openConfirmation}
        onHide={() => setOpenConfirmation(false)}
        published={user.published}
      />
    </div>
  );
}