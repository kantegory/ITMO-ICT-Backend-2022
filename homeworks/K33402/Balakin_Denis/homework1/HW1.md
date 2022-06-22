# Домашняя работа 1

## Инициализация npm-пакета
```sh
npm init --yes
```

## Установка express
```sh
npm install express
```

## Удаление express/попытка его обновить
```sh
npm update express
npm uninstall express
```

## Написание кастомной команды для npm, чтобы можно удалить express командой “npm run rme”
```
{
    "scripts": {
        "rme": "npm uninstall express"
    }
}
```