import type { CoachPackage } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface CoachPackagesSectionProps {
  packages: CoachPackage[];
}

export function CoachPackagesSection({ packages }: CoachPackagesSectionProps) {
  if (!packages || packages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Coaching Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This coach has not listed any packages yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Coaching Packages</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-primary">{pkg.name}</CardTitle>
              <CardDescription className="text-2xl font-bold text-foreground">
                ${pkg.price} <span className="text-sm font-normal text-muted-foreground">/{pkg.currency}</span>
              </CardDescription>
              <p className="text-sm text-muted-foreground pt-1">{pkg.description}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Choose Package</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
