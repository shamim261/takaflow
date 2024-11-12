import { AlertCircle } from "lucide-react";

interface Props {
  error?: string;
}

const ErrorComponent = ({ error }: Props) => {
  if (!error) {
    return null;
  }
  return (
    <div className="!my-4 p-4 w-full h-12 border-red-600/20 rounded-xl flex items-center space-x-2 border-2">
      <AlertCircle className="h-6 w-6 text-red-600" />{" "}
      <p className="text-red-600">
        <span className="font-semibold ">Error: </span>
        {error}
      </p>
    </div>
  );
};

export default ErrorComponent;
