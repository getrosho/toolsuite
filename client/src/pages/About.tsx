import { AdSlot } from '@/components/AdSlot';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Zap, Shield, Heart, Globe } from 'lucide-react';

export default function About() {
  return (
    <div>
      <section className="py-16 transition-theme bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              About ToolSuite
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering productivity through innovative online tools that are free, fast, and secure.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="shadow-lg mb-12">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="text-white w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To provide free, high-quality online tools that enhance productivity and simplify digital workflows. 
                We believe powerful tools shouldn't come with barriers – no registration, no subscriptions, 
                just instant access to the utilities you need.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">What We Stand For</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Speed & Efficiency</h3>
                <p className="text-sm text-muted-foreground">
                  Lightning-fast tools that deliver results instantly without unnecessary complexity.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-green-600 dark:text-green-400 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Privacy & Security</h3>
                <p className="text-sm text-muted-foreground">
                  Your data stays yours. We process everything securely and never store personal information.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">User-Centric Design</h3>
                <p className="text-sm text-muted-foreground">
                  Intuitive interfaces designed for real people solving real problems every day.
                </p>
              </div>
            </div>
          </div>

          {/* Story */}
          <Card className="shadow-lg mb-12">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Users className="text-primary w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold text-foreground">Our Story</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ToolSuite was born from a simple observation: too many online tools are buried behind 
                  paywalls, complicated signup processes, or cluttered with ads that make them barely usable. 
                  We believed there had to be a better way.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our team of developers and designers came together with a shared vision: create a 
                  comprehensive suite of professional-grade tools that anyone can access instantly. 
                  No barriers, no compromise on quality.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, ToolSuite serves millions of users worldwide – from students working on 
                  assignments to professionals managing complex projects. Every tool we build is 
                  crafted with care, tested thoroughly, and optimized for the best possible user experience.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">12+</div>
                <div className="text-sm text-muted-foreground">Free Tools</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">1M+</div>
                <div className="text-sm text-muted-foreground">Monthly Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">150+</div>
                <div className="text-sm text-muted-foreground">Countries Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Future Vision */}
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="text-white w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Looking Ahead</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're continuously expanding our toolkit with new features and capabilities. 
                Our roadmap includes AI-powered tools, advanced collaboration features, and 
                mobile apps – all while maintaining our commitment to simplicity and accessibility.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ad Slot */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot size="rectangle" className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
