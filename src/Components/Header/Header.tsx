import { Anchor, Group } from '@mantine/core';
import './Header.scss'
import { Config } from '../../config/types';

function Header({ EARTH_FRONTEND_HOST, MARS_FRONTEND_HOST, INIT_FRONTEND_HOST }: Config) {
    return (
        <div className="header">
            <Anchor
                href={INIT_FRONTEND_HOST}
                // target="_blank"
                underline="hover"
                c="white"
                size='lg'
                fw={500}
            >
                Панель конфигурации
            </Anchor>
            <div className="other-services">
                <Group>
                    <Anchor
                        className="custom-anchor"
                        href={EARTH_FRONTEND_HOST}
                        target="_blank"
                        underline="hover"
                        c="white"
                        size='lg'
                        fw={500}
                    >
                        Сервис земли
                    </Anchor>
                    <Anchor
                        className="custom-anchor"
                        href={MARS_FRONTEND_HOST}
                        target="_blank"
                        underline="hover"
                        c="white"
                        size='lg'
                        fw={500}
                    >
                        Сервис марса
                    </Anchor>
                </Group>
            </div>
        </div>
    );
}

export default Header