import SideNavBar from "@/components/custom/side-navbar"

const SearchLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="m-auto flex w-full max-w-4xl justify-center gap-10">
      <SideNavBar />
      {children}
    </div>
  )
}

export default SearchLayout
