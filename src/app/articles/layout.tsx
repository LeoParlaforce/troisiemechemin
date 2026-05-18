import NewsletterPopup from "@/components/NewsletterPopup"

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NewsletterPopup />
    </>
  )
}
