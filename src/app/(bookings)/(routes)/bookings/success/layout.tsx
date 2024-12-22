export default function PaymentSuccessLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="h-full bg-black min-h-screen">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </div>
    )
  }
  