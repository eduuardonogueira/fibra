export default function SelectDisabled({ text }: { text: string }) {
  return (
    <p className="border-1 border-gray-100 py-2.5 px-3 rounded-md w-full text-sm/[14px] font-normal text-gray-400">
      {text}
    </p>
  );
}
