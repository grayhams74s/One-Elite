export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 flex flex-col gap-4 p-4 md:p-8">
      {children}
    </div>
  )
}
