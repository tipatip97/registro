###FILES
1. наименование файлов, кроме основных, должны начинаться с маленькой буквы и иметь вид {имя}.{тип сущности (service, model...)}.{расширение}
    1. файл-компонент называется именем компонента + .tsx
    2. интерфейсы, энамы и т.д. хранятся в файле {имя компонента}.model.ts
    3. все операции общения с АПИ происходят в сервисах. 

###CSS
1. инкапсуляцию не используем.
2. каждый компонент должен иметь главный css-класс, уникальный по проекту.
3. все вложенные теги должны иметь css-классы, и обращение к ним должно
происходить по "родственной вложенности", т.е. по стрелочке ">".
4. файлы .cscc должны содержать название главного css-класса текущего компонента, и иметь "родственную вложенность".

###NPM
1. при изменении файла package.json необходимо его копировать в корень проекта.