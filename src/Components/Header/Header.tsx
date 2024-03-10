import { Group } from '@mantine/core';
import './Header.scss'
import { Config } from '../../config/types';

function Header({ EARTH_FRONTEND_HOST, MARS_FRONTEND_HOST, INIT_FRONTEND_HOST }: Config) {
    return (
        <div className="header">
            <a
                href={INIT_FRONTEND_HOST}
            // target="_blank"
            >
                Панель конфигурации
            </a>
            <div className="other-services">
                <Group>
                    <a
                        className="custom-anchor"
                        href={EARTH_FRONTEND_HOST}
                        target="_blank"
                    >
                        Сервис земли
                    </a>
                    <a
                        className="custom-anchor"
                        href={MARS_FRONTEND_HOST}
                        target="_blank"
                    >
                        Сервис марса
                    </a>
                </Group>
            </div>
        </div>
    );
}

export default Header