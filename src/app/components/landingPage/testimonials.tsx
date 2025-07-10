"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelance Designer",
    avatar: "/images/avatars/1.jpg",
    content: "This app completely changed how I manage my finances. The budgeting features helped me save 30% more each month without feeling restricted."
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    avatar: "/images/avatars/2.jpg",
    content: "As someone who hates spreadsheets, this is a godsend. Beautiful interface with all the power I need to track my investments and expenses."
  },
  {
    name: "Emma Rodriguez",
    role: "Small Business Owner",
    avatar: "/images/avatars/3.jpg",
    content: "The multi-currency support is fantastic for my business. I can track expenses in different currencies and get a clear picture of my finances."
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto max-w-[1240px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by Thousands of Users
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join people who have transformed their financial lives with our app.
          </p>
        </motion.div>

        <div className="grid gap-8 mt-16 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="p-8 flex flex-col items-center justify-center border border-[#e47a1d] rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-lg text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="mt-6 text-lg text-center text-gray-600">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}