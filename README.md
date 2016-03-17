<h3>DESCRIPTION</h3>

EuBrazilCC UC3 Gateway integrates tools to understand how biodiversity (and its ecosystems) is buffering climate change and may reduce negative effects of climate change.

This package contains the Gateway web application, which can be used to submit and visualize the output of workflows combining the analysis of data acquired with different technologies with meteorological and biodiversity data to study the impact of climate change in regions with high interest for biodiversity conservation.

<h3>PREREQUISITES</h3>
<ol>
  <li>Apache Tomcat servlet container 7.x</li>
  <li>Java 1.7 or above</li>
</ol>

<h3>INSTALLATION</h3>
The front-end of the web application has been implemented by using the javascript library Sencha ExtJS. In order to make usable the package, it is necessary to:
- download the javascript library ExtJS v4.2.1
- create a folder under WebContent and name it 'extjs'
- move the content of the ExtJS package under the new folder.

In addition, the application needs of a set of Java libraries which have to be included in the project. These libraries are specified in the file NOTICE under the root of this project.
After the download of the JARs required, follow these steps:
- create a directory under the path WebContent/WEB-INF/ and name it 'lib'
- move the JARs under the new folder.
