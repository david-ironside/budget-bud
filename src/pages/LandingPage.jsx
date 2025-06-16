import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";



export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center pt-20 pb-16 px-6 relative z-0">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Future Self Will Thank You</h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">
          Break free from the paycheck-to-paycheck cycle. The 50/30/20 method makes financial peace possible.
        </p>
        <Button size="lg" onClick={() => navigate("/register")}>Start Your Free Trial</Button>
        <div className="mt-10 flex justify-center gap-6 mx-auto w-fit">
          <Card className="w-24 glass h-24">
            <CardContent>50%<br/>Needs</CardContent>
          </Card>
          <Card className="w-24 glass h-24">
            <CardContent>30%<br/>Wants</CardContent>
          </Card>
          <Card className="w-24 glass h-24">
            <CardContent>20%<br/>Savings</CardContent>
          </Card>
        </div>
      </section>

      {/* Reality Check */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">78% of young adults live paycheck to paycheck</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Without a plan, it’s easy to fall behind. Budget Bud helps you take control before it’s too late.
        </p>
      </section>

      {/* Emotional Benefits */}
      <section className="py-20 px-6 grid md:grid-cols-3 gap-8 text-center">
        {["Sleep better knowing you're on track", "Move into your dream home sooner", "Enjoy guilt-free spending on what matters"].map((text, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            {text}
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="bg-indigo-50 py-20 px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">Real Stories. Real Results.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Jess, 24", text: "I finally feel in control of my money." },
            { name: "Dre, 27", text: "Budget Bud made saving for my wedding realistic." },
            { name: "Kai, 22", text: "I sleep easier knowing I’m building toward something." }
          ].map(({ name, text }, i) => (
            <Card key={i} className="glass">
              <CardContent className="p-6">
                <p className="italic">"{text}"</p>
                <p className="mt-2 font-bold">{name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Start budgeting smarter, today.</h2>
        <p className="mb-6">14-day free trial. No credit card required.</p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate("/register")}>Try it Free</Button>
          <Button
  onClick={() => {
    navigate("/login");
  }}
>
  Already have an account?
</Button>

        </div>
      </section>
    </div>
  );
}