import { Switch } from '@headlessui/react';
import clsx from 'clsx';

interface SwitchProperties {
    checked: boolean;
    onChange: (status: boolean) => void;
    [x: string]: unknown;
}

export function NormalSwitch({ checked, onChange, ...rest }: SwitchProperties) {
    return (
        <Switch
            {...rest}
            checked={checked}
            onChange={onChange}
            className={clsx(
                checked ? 'bg-blue-600' : 'bg-gray-600 dark:bg-gray-500',
                'inline-flex h-6 w-11 items-center rounded-full',
            )}>
            <span className="sr-only">Enable notifications</span>
            <span
                className={clsx(
                    checked ? 'translate-x-6' : 'translate-x-1',
                    'inline-block h-4 w-4 rounded-full bg-white transition dark:bg-gray-100',
                )}
            />
        </Switch>
    );
}
