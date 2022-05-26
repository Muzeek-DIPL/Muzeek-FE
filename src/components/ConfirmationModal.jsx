import { Button, Modal, Spinner } from "react-bootstrap";

export default function ConfirmationModal(props) {
  const { published, handleUserPublish, isSubmittingPublish } = props;
  let message, btnText;

  if (!published) {
    message = "Publish profile anda sebagai musisi?";
    btnText = "Publish";
  } else {
    message = "Unpublish profile anda dari musisi?";
    btnText = "Unpublish";
  }

  const onClickConfirm = () => {
    // if (!published) {
    //   const timestamp = Date.now();
    //   const newPublishDate = new Date(timestamp).toISOString();
    //   props.onClick({ published: !published, date_published: newPublishDate });
    // }
    // props.onClick({ published: !published });
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop={isSubmittingPublish ? "static" : true}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="py-4">
        <p className="text-center">{message}</p>
        <div className="d-flex gap-3 justify-content-center">
          <Button
            variant="primary"
            className="rounded py-2 px-3"
            onClick={handleUserPublish}
            disabled={isSubmittingPublish}
          >
            {isSubmittingPublish ? (
              <Spinner
                variant="light"
                animation="border"
                size="sm"
                aria-hidden="true"
              />
            ) : (
              btnText
            )}
          </Button>
          <Button
            variant="outline-primary"
            className="rounded py-2 px-3"
            onClick={props.onHide}
            disabled={isSubmittingPublish}
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
