interface LineProps {
  className?: string
  type?: "horizontal" | "vertical"
}

export const Line: React.FC<LineProps> = ({ type = "horizontal", className }) => {
  return (
    <p
      className={`size-[1px] ${type === "vertical" ? "h-screen" : "w-screen"} bg-gray-800 ${className}`}
    ></p>
  )
}
