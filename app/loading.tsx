import Spinner from "@/components/Spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner classNames="h-14 w-14" />
    </div>
  );
};

export default Loading;
