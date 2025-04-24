"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card"; // Import Card from shadcn/ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from 'lucide-react'; // Import Loader2 for loading state

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Replace this with your actual form submission logic (e.g., API call)
  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    console.log("Form submitted:", values);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);

    // Display success toast
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });

    // Reset form
    form.reset();
  }

  return (
    <section id="contact" className="space-y-8 max-w-xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight text-primary">Get In Touch</h2>
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20 p-6 md:p-8 neon-glow-primary">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Name</FormLabel>
                  <FormControl>
                    <Input
                     placeholder="Your Name" {...field}
                     className="bg-input/50 border-primary/30 focus:border-accent focus:ring-accent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Email</FormLabel>
                  <FormControl>
                    <Input
                     type="email"
                     placeholder="your.email@example.com" {...field}
                     className="bg-input/50 border-primary/30 focus:border-accent focus:ring-accent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Message</FormLabel>
                  <FormControl>
                    <Textarea
                     placeholder="Your message here..."
                     {...field}
                     rows={5}
                     className="bg-input/50 border-primary/30 focus:border-accent focus:ring-accent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
             type="submit"
             className="w-full bg-accent text-accent-foreground hover:bg-accent/90 neon-glow-accent font-semibold"
             disabled={isSubmitting} >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> // Use Loader2 icon
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </Card>
    </section>
  );
}

// Dummy Card and Cog components removed as they are now imported or replaced
