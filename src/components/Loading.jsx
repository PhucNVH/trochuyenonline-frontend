import { useLoading, Puff } from '@agney/react-loading';

export default function Loading({ loading }) {
  const { indicatorEl } = useLoading({
    loading: loading,
    indicator: <Puff width="80" color="#DEE5FF" />,
  });

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      {indicatorEl}
    </div>
  );
}
