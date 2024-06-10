import { Button } from "./button"
import { ScrollArea } from "./scroll-area"
import { Separator } from "./separator"

const categories: Array<{ [key: string]: { name: string; icon: string }[] }> = [
  {
    languages: [
      { name: "TypeScript", icon: "typescript-icon" },
      { name: "JavaScript", icon: "javascript-icon" },
      { name: "Python", icon: "python-icon" },
      { name: "Java", icon: "java-icon" },
      { name: "Go", icon: "go-icon" },
      { name: "C#", icon: "csharp-icon" },
      { name: "Ruby", icon: "ruby-icon" },
      { name: "Rust", icon: "rust-icon" },
      { name: "PHP", icon: "php-icon" },
      { name: "Swift", icon: "swift-icon" },
      { name: "C++", icon: "cpp-icon" },
      { name: "C", icon: "c-icon" },
      { name: "Kotlin", icon: "kotlin-icon" },
      { name: "Scala", icon: "scala-icon" },
      { name: "Haskell", icon: "haskell-icon" },
      { name: "Perl", icon: "perl-icon" },
      { name: "Objective-C", icon: "objc-icon" },
      { name: "R", icon: "r-icon" },
      { name: "Shell", icon: "shell-icon" }
    ]
  },
  {
    frameworks: [
      { name: "React", icon: "react-icon" },
      { name: "Vue", icon: "vue-icon" },
      { name: "Angular", icon: "angular-icon" },
      { name: "Svelte", icon: "svelte-icon" }
    ]
  },
  {
    databases: [
      { name: "PostgreSQL", icon: "postgresql-icon" },
      { name: "MongoDB", icon: "mongodb-icon" },
      { name: "MySQL", icon: "mysql-icon" },
      { name: "SQLite", icon: "sqlite-icon" }
    ]
  },
  {
    tools: [
      { name: "Git", icon: "git-icon" },
      { name: "Docker", icon: "docker-icon" },
      { name: "Kubernetes", icon: "kubernetes-icon" },
      { name: "Jenkins", icon: "jenkins-icon" }
    ]
  }
]

const SideNavBar = () => {
  return (
    <nav className="min-h-screen w-72 border-r">
      <h1 className="mx-8 my-6 text-lg font-medium">Filter by</h1>

      <ScrollArea>
        <ul>
          {categories.map((category, index) => {
            return (
              <>
                <li key={index} className="my-4">
                  <h2 className="font-sm mx-8 capitalize text-gray-400">
                    {Object.keys(category)[0]}
                  </h2>
                  <ul className="m-4 flex flex-col gap-2">
                    {Object.values(category)[0].map((item, index) => {
                      return (
                        <Button
                          variant={"ghost"}
                          className="w-full justify-start px-8 text-sm font-normal capitalize"
                          key={index}
                        >
                          {item.name}
                        </Button>
                      )
                    })}
                  </ul>
                </li>
                <Separator className="my-4 last-of-type:hidden" />
              </>
            )
          })}
        </ul>
      </ScrollArea>
    </nav>
  )
}

export default SideNavBar
