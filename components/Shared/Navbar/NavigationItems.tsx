import React from 'react';
import type { FC } from 'react';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NavigationMenuProps {}

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Ranking',
    href: '/',
    description: `Today's Cryptocurrency Prices by Market Cap`,
  },
  {
    title: 'Categories',
    href: '/categories',
    description: `Cryptocurrency Sectors by 24h Price Change`,
  },
];

const exchanges: { title: string; href: string; description: string }[] = [
  {
    title: 'Spot',
    href: '/exchanges',
    description: 'Top Cryptocurrency Spot Exchanges',
  },
  {
    title: 'Derivatives',
    href: '/exchanges/derivatives',
    description: 'Top Cryptocurrency Derivatives Exchanges',
  },
];

const NavigationItems: FC<NavigationMenuProps> = ({}) => {
  return (
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Cryptocurrencies</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 lg:w-[400px] ">
            {components.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}
              >
                {component.description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Exchanges</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 lg:w-[400px] ">
            {exchanges.map((exchange) => (
              <ListItem
                key={exchange.title}
                title={exchange.title}
                href={exchange.href}
              >
                {exchange.description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/docs" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Price
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default NavigationItems;
