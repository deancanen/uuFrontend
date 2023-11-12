import { Toast } from "flowbite-react";

function Toast(props) {
  const [showToast, setShowToast] = useState(true);

  return (
    showToast && (
      <Toast className="transition fixed bottom-4">
        <div className="pl-4 text-sm font-normal">{props.text}</div>
      </Toast>
    )
  );
}

export default Toast;
