'use client';

import { Mail } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PlusSigns } from '@/components/icons/plus-signs';
import { Meteors } from '@/components/magicui/meteors';
import { EXTERNAL_LINKS } from '@/constants/external-links';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const contactOptions = [
  {
    icon: FaXTwitter,
    title: 'Twitter/X',
    description: 'Keep up with releases and behind-the-scenes moments.',
    href: EXTERNAL_LINKS.TWITTER,
  },
  {
    icon: Mail,
    title: 'Email us directly',
    description: 'For enterprise pricing, partnerships, or anything else:',
    href: EXTERNAL_LINKS.EMAIL,
  },
];

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z
    .string()
    .min(1, 'Work email is required')
    .email('Enter a valid email'),
  company: z.string().optional(),
  companySize: z
    .enum(['1-10', '11-50', '51-200', '201-1000', '1000+'])
    .optional(),
  hearAbout: z.string().optional(),
  isAgency: z.boolean().default(false).optional(),
});

type ContactFormData = z.infer<typeof formSchema>;

export function ContactSection() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      companySize: undefined,
      hearAbout: '',
      isAgency: false,
    },
  });

  async function onSubmit(values: ContactFormData) {
    try {
      const response = await fetch(
        'https://workflow.airscarp.com/webhook/api/brantial/contact',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        },
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      form.reset();
    } catch (error) {
      console.error('Failed to submit contact form:', error);
    }
  }
  return (
    <section className="container">
      <div className="hidden border border-t-0 p-7.5 md:block" />

      <div className="grid grid-cols-1 items-center divide-y border-x md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* Left Side - Contact Options */}
        <div className="divide-y">
          <div className="bordered-div-padding relative space-y-6 md:space-y-8 lg:space-y-10">
            <PlusSigns className="absolute inset-0 -mt-0.25 hidden !h-[calc(100%+2px)] -translate-x-full border-y md:block" />
            <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
              Talk to the Brantial team
            </h1>
            <p className="text-muted-foreground mx-auto max-w-[700px] text-sm leading-relaxed md:text-lg lg:text-xl">
              Have an idea, a question, or a collaboration in mind? Reaching out
              is not just filling out a form, it is contributing to the future
              of our brand.
            </p>
          </div>
          {contactOptions.map((option, index) => (
            <a
              key={index}
              href={option.href}
              target="_blank"
              className="bordered-div-padding hover:bg-muted/30 dark:hover:bg-muted transition-color flex items-center gap-3"
            >
              <option.icon className="size-10 shrink-0 p-2.5" />
              <div>
                <h3 className="text-secondary font-medium">{option.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {option.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Right Side - Contact Form */}
        <div className="bordered-div-padding">
          <h2 className="text-secondary mb-6 text-lg font-medium">
            How can we help?
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
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
                    <FormControl>
                      <Input type="email" placeholder="Work email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10</SelectItem>
                          <SelectItem value="11-50">11-50</SelectItem>
                          <SelectItem value="51-200">51-200</SelectItem>
                          <SelectItem value="201-1000">201-1000</SelectItem>
                          <SelectItem value="1000+">1000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hearAbout"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="How did you hear about Brantial?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAgency"
                render={({ field }) => (
                  <div className="flex items-center gap-3 pt-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span className="text-sm">We're an agency</span>
                  </div>
                )}
              />
              <div className="flex items-center justify-between pt-2">
                <p className="text-muted-foreground text-sm">
                  You can also email us at our{' '}
                  <a
                    className="text-secondary underline-offset-4 hover:underline"
                    href={EXTERNAL_LINKS.EMAIL}
                    target="_blank"
                  >
                    sales email
                  </a>
                </p>
                <Button
                  type="submit"
                  className="rounded-sm"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Sending…' : 'Send message'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="relative hidden overflow-hidden border-x border-t p-20 md:block">
        <Meteors
          number={1000}
          angle={65}
          maxDuration={20}
          minDuration={5}
          className="opacity-10 [&>div]:opacity-10"
        />
      </div>
    </section>
  );
}
