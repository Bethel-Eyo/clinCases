1. How long did you spend on the coding test? What would you add to your solution if you had more time?

# Answer:  about 3days researching, analysing, coding and brainstorming on the calculations and solutions I provided.
1b) I would have added more statistical data and analytical representation in form of a pie chart to display how the cases in a particular district compares to the overall cases in germany. Also to show the relationship between incidence and cases. Or plotting a graph of both against each other would give a better overview and summary of it.

2. What alternative approaches/solutions to the user story did you consider when engineering your solution? What benefits/downsides would they have had compared to the selected solution?

# Answer: The steps I took towards the implementation of the solution are listed below

a) I got the list of all the districts in germany from the '/districts' endpoint and displayed them using a flatlist.

b) On Click on a particular district on the list, I got the district id and used it to call both the '/districts/${districtId}/history/cases/${range}' and the '/districts/${districtId}/history/incidence/${range}' endpoints to help me get more detailed data for the selected district which helped me calculate the -

i) Total cases in the Last 7/30/90 days (based on what the preference that the user selects)
ii) Increase/Decrease in Percentage in the Last 7/30/90 days (based on what the preference that the user selects) compared to the overall cases.
iii) The selected district week Incidence
iv) The average week Incidence for the Last 7/30/90 days (based on what the preference that the user selects).

c) I also displayed a graphical representation of the statistical data for the Last 7/30/90 days (based on what the preference that the user selects).

This enables the user to get detailed information from all the data and statistical analysis provided know how his/her hospital might be affected by the virus in the coming days and weeks which completely achieves the desired solution.

3. What additional features/improvements do you think could help the customer gain more value from your application?

# Answer: Push Notifications - to enable to users to be alerted when there is a new case in thier district

4. Where do you see issues in your code that might cause issues in the future? How would you monitor the performance of your app?

# Answer. Error boundary - if the API structure changes in the near future, some parts of the app might break/crash and it might not be a good experience to the user, therefore it will be nice to have a screen that stops the app from crashing when it throws an exception, and this screen can provide information to the user about what has gone wrong with the app, with an instruction to restart the app or send in reports.
# 4b. I use sentry for react native to monitor the perfomance and exceptions that might occur during production.

5. How would you improve the API that you just used or its documentation?

# Answer: I will provide detailed information about what each parameter in the payload returned by the endpoint represents.

6. What did you think about this test? How interesting was it for you? How would you recommend us to improve the test?

# Answer: The test was great. and it helped me learn more about new terms(like weekIncidence) in the health sector surrounding the covid 19 pandemic and how to calculate them if given a set of data.